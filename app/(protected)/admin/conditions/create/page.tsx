import {Container, Box, Paper, Typography, TextField, Button} from "@mui/material";
import {handleSubmit} from "@/app/actions/admin/createCondition";

const CreatePage = () => {
    const errors = {
        condition: 'Condition is required',
    };

    return (
        <Container maxWidth='sm' sx={{flexGrow: 1, pt: 5}}>
            <Paper elevation={1} component={Box} p={2} sx={{width: '100%', maxWidth: 'auto', margin: 'auto'}}>
                <Box sx={{mb: 2}}>
                    <Typography fontWeight="bold" variant="h6" align="center" gutterBottom>
                        Add New Condition
                    </Typography>
                </Box>
                <Box
                    component="form"
                    action={handleSubmit}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {xs: '1fr', sm: '1fr 1fr'},
                        gap: 2,
                        width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        name="condition"
                        label="Enter condition"
                        variant="outlined"
                        size="small"
                        error={!!errors.condition}
                        helperText={errors.condition}
                        fullWidth
                        sx={{gridColumn: '1/-1'}}
                    />
                    <Button type="submit" variant="outlined" color="primary" sx={{gridColumn: '1/-1', mb: 2}}>
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CreatePage;
