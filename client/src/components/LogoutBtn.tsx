import Button from '@mui/material/Button'

const LogoutBtn = () => {

    const handleSubmit = async () => {
        console.log("Logged out")
        localStorage.removeItem("access_token")
    }

    return (
        <>
            <Button variant="contained" color="info" onClick={() => handleSubmit()}>
                Log out
            </Button>
        </>
    )
}

export default LogoutBtn