import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'
import * as fetch from 'isomorphic-fetch'

interface User {
  id: string
}

interface GoogleTokenInfoResponse {
  sub: string
  email: string
  name: string
  given_name: string
  family_name: string
  picture: string
}

interface GraphQLCreateUserPayload {
  googleUserId: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  avatarUrl: string
}

interface EventData {
  googleToken: string
}

function parseGoogleTokenInfo(
  tokenInfo: GoogleTokenInfoResponse
): GraphQLCreateUserPayload {
  const { sub, email, name, given_name, family_name, picture } = tokenInfo

  return {
    googleUserId: sub,
    email,
    firstName: given_name,
    lastName: family_name,
    displayName: given_name,
    avatarUrl: picture,
  }
}

async function getGoogleTokenInfo(
  googleToken: string
): Promise<GoogleTokenInfoResponse> {
  const endpoint = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
  const data = await fetch(endpoint).then(response => response.json())

  if (data.error_description) {
    throw new Error(data.error_description)
  }

  return data
}

async function getGoogleUser(
  googleToken: string
): Promise<GraphQLCreateUserPayload> {
  const googleUser = await getGoogleTokenInfo(googleToken)
  return parseGoogleTokenInfo(googleUser)
}

async function getGraphcoolUser(
  api: GraphQLClient,
  googleUserId: string
): Promise<{ User }> {
  const query = `
    query getUser($googleUserId: String!) {
      User(googleUserId: $googleUserId) {
        id
      }
    }
  `

  const variables = {
    googleUserId,
  }

  return api.request<{ User }>(query, variables)
}

const CREATE_USER_MUTATION = `
mutation createUser(
  $googleUserId: String!
  $email: String!
  $firstName: String!
  $lastName: String!
  $displayName: String!
  $avatarUrl: String
) {
  createUser(
    googleUserId: $googleUserId
    email: $email
    firstName: $firstName
    lastName: $lastName
    displayName: $displayName
    avatarUrl: $avatarUrl
  ) {
    id
  }
}
`

async function createGraphcoolUser(
  api: GraphQLClient,
  user: GraphQLCreateUserPayload
): Promise<string> {
  return api
    .request<{ createUser: User }>(CREATE_USER_MUTATION, user)
    .then(r => r.createUser.id)
}

async function googleAuthentication(event: FunctionEvent<EventData>) {
  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { googleToken } = event.data

    // call google API to obtain user data
    const googleUser = await getGoogleUser(googleToken)

    // get graphcool user by google id
    const user: User = await getGraphcoolUser(
      api,
      googleUser.googleUserId
    ).then(r => r.User)

    // check if graphcool user exists, and create new one if not
    let userId: string | null = null

    if (!user) {
      userId = await createGraphcoolUser(api, googleUser)
    } else {
      userId = user.id
    }

    // generate node token for User node
    const token = await graphcool.generateAuthToken(userId!, 'User')

    return { data: { id: userId, token } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occurred during authentication.' }
  }
}

export default googleAuthentication
