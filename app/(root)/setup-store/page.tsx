import React from "react";
import Container from "@mui/material/Container";
import SetupStoreForm from "@/app/components/SetupStoreForm";

const SetupStorePage = () => (
    <Container maxWidth='sm' sx={{flexGrow: 1, pt: 20}}>
        <SetupStoreForm/>
    </Container>
);

export default SetupStorePage;

