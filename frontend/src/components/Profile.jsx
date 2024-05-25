import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';

const Profile = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h2" gutterBottom>
                Jill Anderson
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Bio" />
                        <CardContent>
                            <Typography variant="body2">
                                Jill is a Regional Director who travels frequently for work. She
                                has a specific region in which she travels and often visits the
                                same cities and stays at the same hotels. She is frustrated by
                                the fact that no matter how frequently she takes trips, she
                                spends hours of her day booking travel. She expects her travel
                                solutions to be as organized as possible.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Grid container direction="column">
                            <Grid item>
                                <CardHeader title="Goals" />
                            </Grid>
                            <Grid item container spacing={1} padding={1}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Spend less time booking travel</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Personality" />
                        <CardContent>
                            <Typography variant="body2">
                                Jill enjoys planning her business trips but finds the booking
                                process time-consuming and frustrating. She is not very tech-savvy
                                and dislikes the current process.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader title="Additional Info" />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Age:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">20</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Status:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Single</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Location:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Rocky</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Archetype:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Frequent Flyer</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Favourite Brands:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Nike, Netflix, Adidas</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
