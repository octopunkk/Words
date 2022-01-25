import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import "./GameOver.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stats } from "../Stats/Stats";

let mode = "dark";

const theme = createTheme({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "rgb(34, 34, 68)",
            light: "rgb(45, 43, 85)",
            dark: "rgb(22, 22, 46)",
          },
        }
      : {
          primary: {
            main: "rgb(34, 34, 68)",
          },
          divider: "rgb(34, 34, 68)"[700],
          background: {
            default: "rgb(45, 43, 85)",
            paper: "rgb(45, 43, 85)",
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});
export function GameOver(props) {
  let handleClick = () => {
    props.resetGame();
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const winDialog = "Congrats ! You won";
  const loseDialog = `Better luck next time ! Word to find was ${props.answer}`;

  return (
    <ThemeProvider theme={theme}>
      <div className="GameOverParent">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          onBackdropClick={handleClose}
        >
          <DialogTitle>{props.winStatus ? "STATS" : "GAME OVER"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.winStatus ? winDialog : loseDialog}
            </DialogContentText>
          </DialogContent>
          <Stats timeBegin={props.timeBegin} timeEnd={props.timeEnd} />
          <DialogActions>
            <Button
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={handleClick}
            >
              New game
            </Button>
            <Button onClick={handleClose} startIcon={<CloseIcon />}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
