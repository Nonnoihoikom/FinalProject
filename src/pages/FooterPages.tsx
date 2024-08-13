import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import "../Footer.css";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" font-weight="bold">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Thanaphat Parnatekaew
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <div className="footer-container">
      <Container maxWidth="sm">
        <Box className="icon-container">
          <FacebookIcon className="social-icon" />
          <TwitterIcon className="social-icon" />
          <InstagramIcon className="social-icon" />
          <PhoneInTalkOutlinedIcon className="social-icon" />
        </Box>
        <Copyright />
      </Container>
    </div>
  );
}
