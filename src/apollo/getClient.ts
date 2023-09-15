import { HttpLink } from "@apollo/client";
import {
    NextSSRInMemoryCache,
    NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const authLink = setContext((_, { headers }) => {
    const token = cookies().get("token")?.value;
    //  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0MjQ2MjQxMjQzNCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY5NDcxMjI0NCwiZXhwIjoxNjk0ODg1MDQ0fQ.RDo4ijTFTYnOaame-Y-yToy3kyJVzuUlRabsksLjj-w";

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const Link = authLink.concat(link);

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: Link,
    });
});