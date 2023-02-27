import { Button, Typography } from "@mui/material";


const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    return (
        <div role="error">
            <Typography>Something went wrong!!</Typography>
            <pre>error.message</pre>
            <Button >try again</Button>
        </div>
    )
}

export default ErrorFallback;