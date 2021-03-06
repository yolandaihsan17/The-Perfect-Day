import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import './Footer.scss'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        The Perfect Day
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgb(255, 231, 195)'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1">
            for your perfect day, we are here.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>

    // <>
    //   <div class="divider-footer"></div>
    //   <div class='lx-footer-container'>
    //     <div class='lx-footer-main'>
    //       <div class='section-1'>
    //         <a href="https://landx.id/#why-landx">Mengapa LandX</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/#ongoing-projects">Proyek</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/#how-it-works">Cara Kerja</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/contact.html">Kontak</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/blog/">Blog</a>
    //         <span class="border-bot"></span>
    //       </div>
    //       <div class='section-2'>
    //         <div>Perusahaan</div>
    //         <a href="https://landx.id/blog/jobs-at-landx/">Karir</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/syarat-dan-ketentuan.html">Syarat & Ketentuan</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/privacy-policy.html">Kebijakan Privasi</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/service-level-agreement.html">Service Level Agreement</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/kebijakan-isms.html">Kebijakan ISMS</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/mitigasi-risiko.html">Mitigasi Resiko</a>
    //         <span class="border-bot"></span>
    //         <a href="https://landx.id/blog/faq-landx/">FAQ</a>
    //       </div>
    //       <div class='section-3'>
    //         <div class="icon-container">
    //           <a href="https://id.linkedin.com/company/landx-id?trk=public_profile_topcard_current_company"><i class="fab fa-linkedin"></i></a>
    //           <a href="https://www.facebook.com/landx.id"><i class="fab fa-facebook-square"></i></a>
    //           <a href="https://www.instagram.com/landx.id"><i class="fab fa-instagram"></i></a>
    //         </div>

    //         <div class="copyright">&copy; 2020 LandX Indonesia. All Rights Reserved.</div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}