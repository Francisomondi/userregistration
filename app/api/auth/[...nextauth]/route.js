import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
        credentials: {},
        async authorize(credentials){
            const user = {id: '1'}
            return user

        }

        })
        
    
    ],
    session: {
        strategy: 'jwt'
    },
    secret:{
        
    }
        
}