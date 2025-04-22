'use client';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PromoSchedule from "@/app/components/admin/PromoSchedule";

type updateParams = {
    id: string | number | undefined;
    open: boolean;
    handleClose: () => void;
    handleSubmit: (formData: FormData) => Promise<void>;
};

const UpdateDialogPage = ({id, open, handleClose, handleSubmit}: updateParams) => {
    const errors = {
        start_at: '',
        end_at: '',
    };

    return (
        <Dialog
            key={id}
            open={open}
            scroll='body'
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const formData: FormData = new FormData(e.currentTarget);

                        handleSubmit(formData);
                    },
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" align={'center'}>
                Edit Deal of the Day
            </DialogTitle>
            <DialogContent dividers>
                <PromoSchedule
                    onScheduleChange={() => {}}
                    errors={errors}
                />
            </DialogContent>
            <DialogActions sx={{justifyContent: 'space-around'}}>
                <Button variant={"outlined"} size={'small'} onClick={handleClose}>Close</Button>
                <Button type="submit" variant="contained" size='small'>Save changes</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UpdateDialogPage;