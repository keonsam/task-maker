import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
type Props = {
  onClick: () => void;
};
export default function NewButton({ onClick }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Fab
        color="primary"
        aria-label="Create"
        onClick={onClick}
        variant="extended"
      >
        <AddIcon sx={{ mr: 1 }} />
        Create
      </Fab>
    </Box>
  );
}
