// TestimonialSection.tsx
import { Avatar, Box, Card, CardContent, Rating, Typography } from "@mui/material";
import { m } from "framer-motion";
import { MotionViewport, varFade } from "src/components/animate";
import Carousel, { CarouselDots, useCarousel } from "src/components/carousel";

const TestimonialSection = () => {

  const carousel = useCarousel({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    ...CarouselDots({
      rounded: true,
      sx: { mt: { md: 3, xs: 1 } },
    }),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  })
  return (
    <Box sx={{ py: 10, px: { md: 3 }, backgroundColor: 'background.default' }}  component={MotionViewport}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" align="center" gutterBottom>
        Hear From Our Customers
      </Typography>

      <Box sx={{ mx: 'auto', maxWidth: 1280 }}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {testimonials.map((item, index) => (
            <Box key={index} sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 3,
                  p: { xs: 0, sm: 3 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 300,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Rating
                    value={item.rating}
                    readOnly
                    precision={0.5}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    "{item.quote}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                      }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Carousel>

      </Box>
      </m.div>
    </Box >
  );
};

export default TestimonialSection;


// testimonialData.ts
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager at BrightTech",
    avatar: "/assets/images/avatars/avatar_1.jpg",
    quote: "Sign is Online made our document workflow incredibly smooth. It's user-friendly, fast, and legally compliant—everything we needed!",
    rating: 5
  },
  {
    name: "Michael Lee",
    role: "Freelance Consultant",
    avatar: "/assets/images/avatars/avatar_2.jpg",
    quote: "As a freelancer, I needed a reliable way to get contracts signed quickly. This tool has saved me so much time and hassle.",
    rating: 4
  },
  {
    name: "Priya Nair",
    role: "Operations Head at CloudNova",
    avatar: "/assets/images/avatars/avatar_3.jpg",
    quote: "The security and ease of use with Sign is Online are top-notch. We’ve fully transitioned to digital signing thanks to them.",
    rating: 5
  },
  {
    name: "David Smith",
    role: "CEO of Startup Hub",
    avatar: "/assets/images/avatars/avatar_4.jpg",
    quote: "I love how intuitive this platform is. It has transformed how we handle contracts and agreements in our startup.",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "HR Manager at Tech Solutions",
    avatar: "/assets/images/avatars/avatar_5.jpg",
    quote: "Sign is Online has streamlined our hiring process. Getting new hires to sign documents is now a breeze!",
    rating: 4
  }
];
