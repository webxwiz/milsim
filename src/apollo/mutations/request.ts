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
mutation CreateEvent($createEventInput: CreateEventInput) {
    createEvent(createEventInput: $createEventInput) {
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