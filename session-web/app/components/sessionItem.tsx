// "use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import moment from "moment";

export const SessionItem = ({ session }: {session: any}) => {
  const { start_date, end_date, program = {} } = session;
  const { thumbnail_img_url, display_title } = program;
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail_img_url}
            alt="session image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {display_title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(start_date).format('MMM Do')} - {moment(end_date).format('MMM Do')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
