import React from 'react'

class MemeGenerator extends React.Component{
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handelChange = this.handelChange.bind(this)
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(responce => responce.json())
            .then(responce => {
                const {memes} = responce.data
                this.setState({allMemeImgs: memes})
            })
    }

    handelChange (event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handelSubmit (e) {
        e.preventDefault()
        const randNumber = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNumber].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="nameForm" onSubmit={this.handelSubmit}>
                    <input
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handelChange}
                    />
                    <input
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handelChange}
                    />

                    <button>Gen</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator
