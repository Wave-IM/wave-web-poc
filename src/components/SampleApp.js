import React, { Component } from 'react';
import './SampleApp.css';
import { Header, ArticleCard } from './'
import * as mock from '../assets/mock.json'
import md5 from 'md5'
import { Button, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import * as DemoAPI from '../modules/api'

class SampleApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            conversations: [],
            selectedConversation: ""
        }


        this.onLogin = this.onLogin.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleUsername = this.handleUsername.bind(this)

    }

    handlePassword(e) {
        this.setState({
            "password": e.target.value
        })
    }

    handleUsername(e) {
        this.setState({
            "username": e.target.value
        })
    }

    onLogin(e) {
        e.preventDefault()

        DemoAPI.login(this.state.username, this.state.password)
    }

    componentDidMount() {

    }

    renderRow(blocks) {

        return <Row className="py-3" key={md5(Math.random())}>{blocks}</Row>
    }

    renderArticles(posts) {

        let blocks = []
        let rows = []

        posts.map((post) => {

            blocks.push(this.renderArticle(post))

            if (blocks.length == 3) {
                rows.push(this.renderRow(blocks))
                blocks = []
            }
        })
        
        rows.push(this.renderRow(blocks))

        return rows
    }

    
    renderArticle(post) {

        return (
            <Col  key={md5(Math.random())} md={4}>
                <ArticleCard
                    key={md5(Math.random())}
                    postAuthorName={post.author.authorName}
                    postAuthorTitle={post.author.title}
                    postTitle={post.title}
                    postText={post.text}
                    postImage={post.imageURL}
                />
            </Col>
        )
    }
    render() {
        return (
            <div className="SampleApp">
                <Header text="Wave Sample App PoC" 
                withLogin={true} handleSubmit={this.onLogin}
                handlePassword={this.handlePassword}
                handleUsername={this.handleUsername}/>
                <Jumbotron className="text-center">
                    <Container>
                        <h1 className="display-4 pb-5">Secret Society of CUI - Pinboard</h1>
                        <p className="lead">This is a simple Proof Of Concept App to illustrate how easy it is to integrate Wave Instant Messaging Services into your application !</p>
                        <hr className="my-4"></hr>
                        <p>Wave Instant Messaging services is a cloud-based, secure and privacy oriented messaging service based on MQTT, OpenPGP and Kubernetes !</p>
                        <p className="lead mt-5">
                            <Button href="https://github.com/Wave-IM" variant="primary" size="lg">Learn more</Button>
                        </p>
                    </Container>
                </Jumbotron>
                <div className="py-5">
                    <h1 className="display-4 pb-5 articles-title">Pins</h1>
                    <Container>
                        <Row>
                            {
                                this.renderArticles(mock.posts)
                            }
                        </Row>
                    </Container>
                </div>
            </div>

        );
    }
}

export default SampleApp;
