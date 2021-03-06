import React from 'react';

/**
 * TitleLayout Component
 * Lets the user browse through puppy images until they come upon one that's
 * sufficiently cute.
 *
 * These images come from a simple API, which in turn grabs them from a
 * Google Custom Search Engine API.
 */
class TitleLayout extends React.Component {

    constructor() {
        super();

        // API lives in same process as web server for the purposes of this demo
        this.apiUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+"/api";

        this.state = {
            puppyIndex: -1
        };
    }

    componentDidMount() {
        this.getPuppyPage();
    }

    componentWillUnmount() {
        this.request.abort();
    }

    setLoadingState() {
        this.setState({
            puppyIndex: -1,
        });
    }

    getPuppyPage() {
        this.setLoadingState();
        this.request = $.get(this.apiUrl + "/pups", function(result) {
            this.setState({
                puppyImageUrls: result.message,
            });
            this.nextPuppy();
        }.bind(this));
    }

    nextPuppy() {
        console.log("nextpuppy");
        $("#currentPuppyImage").hide();
        $(".buttons").hide();
        if(this.state.puppyIndex >= this.state.puppyImageUrls.length - 1) {
            this.getPuppyPage();
        } else {
            const url = this.apiUrl + "/pupit?url=" + encodeURIComponent(this.state.puppyImageUrls[this.state.puppyIndex + 1]) + "&width=520&height=520";
            this.setState({
                puppyIndex: this.state.puppyIndex + 1,
                puppyUrl: url,
                isLoading: false
            });
        }
    }

    onBadImage(e) {
        console.log("bad image");
        this.nextPuppy();
    }

    onImageLoad(e) {
        $(e.target).show();
        $(".buttons").show();
    }

    onStartGame() {
        this.props.startGame(this.state.puppyUrl);
    }

    render() {
        return (
            <div id="gameScreen" class="titleScreen">
                <img id="titleImage" src="title2.png" />
                <div id="currentPuppy">
                    <img id="currentPuppyImage"
                        onClick={this.nextPuppy.bind(this)}
                        onError={this.onBadImage.bind(this)}
                        onLoad={this.onImageLoad.bind(this)}
                        src={this.state.puppyUrl} />
                </div>
                <div class="clearfix buttons">
                    <div class="gameButton left" onClick={this.nextPuppy.bind(this)}>Not Cute Enough</div>
                    <div class="gameButton right" style={{color:'greenyellow'}} onClick={this.onStartGame.bind(this)}>Play!</div>
                </div>
            </div>);
    }

};

export default TitleLayout;
