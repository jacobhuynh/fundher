import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export function Dashboard() {
  return (
    <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
        <Card sx={{ width: "75vh", height: "50vh", maxWidth: '100%', boxShadow: 'lg' }}>
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Typography level="title-lg" sx={{marginBottom: '4vh'}}>“Making Waves” Scholarship for Women</Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                Hello, this is my bio and I am a PRO member of MUI. I am a developer and I
                love to code.
                </Typography>
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                    <Button color='danger' variant='soft'>Nay</Button>
                    <Button color='success' variant='soft'>Slay</Button>
                </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    </div>
  );
}
