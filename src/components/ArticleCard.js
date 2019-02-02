import React, { Component } from 'react';
import $ from 'jquery'
import { Card, Button } from 'react-bootstrap';

class ArticleCard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
                <Card>
                    <Card.Img variant="top" src={this.props.postImage} />
                    <Card.Body>
                        <Card.Title>{this.props.postTitle}</Card.Title>
                        <Card.Subtitle className="pb-4 text-muted">{this.props.postAuthorName} - {this.props.postAuthorTitle}</Card.Subtitle>
                        <Card.Text>{this.props.postText}</Card.Text>
                        <Button variant="outline-secondary">Start Secret Chat with Author</Button>
                    </Card.Body>
                </Card>
        );
    }
}

export default ArticleCard;