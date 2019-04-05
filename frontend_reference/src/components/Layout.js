import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavBar from './NavBar';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3}>
            <NavBar/>
          </Col>
          <Col sm={9}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}
