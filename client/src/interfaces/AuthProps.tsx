import { AuthModeTypes } from "../enums/AuthModeTypes"

export default interface props {
    setIsAuthenticated: React.Dispatch<boolean>,
    setAuthMode: React.Dispatch<AuthModeTypes>
}