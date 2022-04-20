import { makeStyles } from "@material-ui/core";
import { Carousel, Card } from "react-bootstrap";

const useStyles = makeStyles({
    container: {
        width : "100vw",
        display : "flex",
        marginTop : "2%",
        justifyContent: "space-evenly"
    },
    card : {
        width : "20%"
    }
});

const testimonial = [
  {
    content:
      "Over all though it was a great experience and we have had lots of great feedback. We already started promoting our next event and I have been approached by 4 other companies who want to know more about it as they want to use it for their own events.",
    author: "Sarah M., Director of Events",
    img: "https://cdn2.hubspot.net/hubfs/53/Customer-testimonial-page.jpg",
  },
  {
    content:
      "I cannot tell you how much we loved using this silent auction software. Everything was seamless…from set up, to bidding, to payment. We will absolutely use MyEvent next year.",
    author: "Sarah M., CCHS Foundation",
    img: "https://cdn2.hubspot.net/hubfs/53/Customer-testimonial-page.jpg",
  },
  {
    content:
      "I tried MyEvent instead of typical paper raffle tickets. The system was easy to set up online and people who couldn't attend the event were still able to enter the raffle, which was HUGE bump in revenue.",
    author: "Alexander B., Pan-Mass Challenge",
    img: "https://cdn2.hubspot.net/hubfs/53/Customer-testimonial-page.jpg",
  },
  {
    content:
      "MyEvent is a great way to bring in money for your Fund A Need. The 24/7 tech support allows you to feel confident, and the platform makes your Fund a Need so much easier to run. Well definitely be using MyEvent again.",
    author: "Amy C., One Less Orphan Fund",
    img: "https://cdn2.hubspot.net/hubfs/53/Customer-testimonial-page.jpg",
  },
];

const Testimonial = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {testimonial.map((item) => (
        <Card className={classes.card}>
            <Card.Img variant="top" src={item.img} />
            <Card.Body>
    <Card.Title>{item.author}</Card.Title>
    <Card.Text>
      {item.content}
    </Card.Text>
  </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Testimonial;
