import React from 'react';

const AboutUs = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 20px green, 0 0 20px red', // Green and red shadow
    padding: '40px',
    width: '80%',
    maxWidth: '800px',
    margin: '0 auto', // Centering the card horizontally with margin
  };

  const companyNameStyle = {
    fontSize: '2em',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '1em',
    textAlign: 'justify',
  };

  return (
    <div style={containerStyle} className="bg-white font-custom">
      <div style={cardStyle}>
        <h1 style={companyNameStyle}>
          <span style={{ color: 'green' }}>Fresh</span>
          <span style={{ color: 'red' }}>2</span>
          <span style={{ color: 'green' }}>Door</span>
        </h1>
        <p style={titleStyle}>About Us</p>
        <p style={textStyle}>
           Our food delivery app offers a wide range of products, including fresh fruits, vegetables, ice cream, sandwiches, and desserts. With just a few taps, users can conveniently order their groceries and have them delivered right to their doorstep. Whether you're at home or on the go, The Grocery Express is here to make your life easier.
          You have the ability to enact change. In bustling urban environments, time is a precious commodity often in short supply for pursuing our desires. Fresh2Door transforms the way you manage tasks, shop for essentials, and navigate your city. We're a platform connecting you with local delivery partners who handle purchases, collect items from any establishment, and deliver them directly to your doorstep. Whether you're caught up in work, stuck in traffic, or simply overwhelmed, our service simplifies the process. Just provide us with your destination, requirements, and schedule, then sit back and relax as we take care of the rest. With Fresh2Door, consider us your dedicated movers, always ready to serve your needs"
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
