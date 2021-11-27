import React from 'react'
import {Container, Grid,Typography} from '@material-ui/core'
export default function Welcome() {
    return (
        <Container>
            <Typography variant="h2" align="center" gutterBottom color="textPrimary" style={{marginTop: '60px'}}>Dialect Classification</Typography> 
        <Grid container style={{marginTop: '60px'}} justify="center">
             
            <Grid item md={6}> <Typography variant="h5" align="center" paragraph color="textSecondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla feugiat massa. In mollis lobortis lorem, quis pretium sapien imperdiet nec. Integer ipsum massa, placerat eu leo sit amet, convallis aliquam enim. Quisque consectetur tellus.
            </Typography> </Grid>
            <Grid item md={6}> <Typography variant="h5" align="center" paragraph color="textSecondary">
                .هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ

                </Typography> </Grid>
        </Grid>
       </Container>
    )
}