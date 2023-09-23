import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
query GetAllEvents {
  getAllEvents {
    _id
    createdAt
    date
    description
    duration
    image
    name
    platoons {
      _id
      color
      image
      name
      squads {
        _id
        busyRoles {
          _id
          discordId
          role
          playerName
        }
        enlisted {
          _id
          discordId
          role
          playerName
        }
        name
        roles {
          _id
          count
          name
        }
        waitingList {
          _id
          discordId
          role
        }
      }
    }
  }
}
`

export const GET_ONE_EVENT = gql`
query GetOneEvent($id: ID) {
  getOneEvent(_id: $id) {
    _id
    createdAt
    name
    image
    description
    date
    duration
    platoons {
      _id
      name
      color
      image
      squads {
        _id
        name
        roles {
          _id
          name
          count
        }
        busyRoles {
          _id
          discordId
          role
          playerName
          roleDiscordId
          roleId
        }
        waitingList {
          _id
          discordId
          role
          playerName
          roleDiscordId
          roleId
        }
        enlisted {
          _id
          discordId
          role
          playerName
          roleDiscordId
          roleId
        }
      }
    }
  }
}
`

export const GET_USER = gql`
query GetUserByToken {
  getUserByToken {
    _id
    createdAt
    discordId
    role
  }
}
`