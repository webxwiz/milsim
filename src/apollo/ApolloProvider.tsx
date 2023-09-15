'use client'
import React from 'react'
import { ApolloLink, HttpLink, split } from '@apollo/client'
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { setContext } from '@apollo/client/link/context'
import Cookies from 'js-cookie'

const makeClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        const token = await Cookies.get('token')
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0MjQ2MjQxMjQzNCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5NDcxMjI0NCwiZXhwIjoxNjk0ODg1MDQ0fQ.RDo4ijTFTYnOaame-Y-yToy3kyJVzuUlRabsksLjj-w";

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        }
    })


    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        fetchOptions: { cache: 'no-store' },
    })
    

    // const Link = split(
    //     ({ query }) => {
    //         const definition = getMainDefinition(query)

    //         return (
    //             definition.kind === 'OperationDefinition' &&
    //             definition.operation === 'subscription'
    //         )
    //     },
    //     wsLink,
    //     authLink.concat(link),
    // )

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({ stripDefer: true }),
                      authLink.concat(httpLink),
                  ])
                : authLink.concat(httpLink),
    })
}

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
                {children}
        </ApolloNextAppProvider>
    )
}

export default Providers