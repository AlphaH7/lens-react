import React, { Component } from 'react';


export default function AnimatedBorder(props) {
    return (
      <div className={`animated-border-ctr ${props.runAnimation ? 'animate' : ''}`}>
        <div className="animated-bg"/>
        <div className="animated-bg"/>
        <div className="animated-bg"/>
        <div className="animated-bg"/>
      </div>
    );
}
