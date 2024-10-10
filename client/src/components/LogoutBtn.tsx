import { Button } from "./ui/button"

const LogoutBtn = () => {

    const handleSubmit = async () => {
        console.log("Logged out")
        localStorage.removeItem("access_token")
        window.location.reload()
    }

    return (
        <>
            <Button onClick={() => handleSubmit()}>
                Log out
            </Button>
        </>
    )
}

export default LogoutBtn