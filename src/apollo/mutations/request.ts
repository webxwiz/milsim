import { gql } from "@apollo/client";

export const SAVE_USER = gql`
mutation SaveUser($discordId: String!) {
    saveUser(discordId: $discordId) {
      token
      user {
        _id
        createdAt
        discordId
        role
      }
    }
  }
`

export const CREATE_EVENT = gql`
mutation Mutation($createEventInput: EventInput) {
  createEvent(createEventInput: $createEventInput) {
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
        }
        waitingList {
          _id
          discordId
          role
          playerName
          roleDiscordId
        }
        enlisted {
          _id
          discordId
          role
          playerName
          roleDiscordId
        }
      }
    }
  }
}
`

export const CHANGE_EVENT = gql`
mutation UpdateEvent($updateEventInput: UpdateEventInput) {
    updateEvent(updateEventInput: $updateEventInput) {
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
          }
          enlisted {
            _id
            discordId
            role
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

export const ADD_USER_TO_EVENT = gql`
mutation AddUserToEvent($addUserToEventInput: AddUserToEventInput) {
    addUserToEvent(addUserToEventInput: $addUserToEventInput) {
      _id
      platoons {
        squads {
          roles {
            _id
            count
            name
          }
          busyRoles {
            _id
            discordId
            role
            playerName
          }
        }
      }
    }
  }
`

export const EVENT_DELETE = gql`
mutation DeleteEvent($id: ID) {
    deleteEvent(_id: $id)
  }
`

export const REMOVE_FROM_BUSY_ROLES = gql`
mutation RemoveFromBusyRoles($removeFromBusyRolesInput: RemoveFromBusyRolesInput) {
  removeFromBusyRoles(removeFromBusyRolesInput: $removeFromBusyRolesInput) {
    _id
  }
}
`