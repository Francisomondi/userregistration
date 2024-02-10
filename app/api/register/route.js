export async function POST(req){
    try {
        const {name, email,password}= await req.json()
        console.log('Name' , name)
        console.log('Email' , email)
        console.log('Password' , password)
        return NextResponse.json({messege: 'user Registered'}, {status:201})
    } catch (error) {
        return NextResponse.json({messege: 'An error occured while registering the user'},{status: 500})
    }
}