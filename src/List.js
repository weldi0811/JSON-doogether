import React, { Component } from 'react'
import axios from 'axios'

class List extends Component {

    state = {
        inputTitle : '',
        inputBody : '',
        isLoading : true,
        list: [],
        showlist: []
    }

    async componentDidMount() {
        var tarik = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
        this.setState({ list: tarik.data })

        var i;
        for (i = 0; i < 10; i++) {
            this.state.showlist.push(this.state.list[i])
        }

        console.log(tarik.data)
        console.log(this.state.showlist)
        this.setState({isLoading : false})
    }


    onChangetitle = (event) => {
        this.setState({
            inputTitle : event.target.value
        })
    }
    onChangebody = (event) => {
        this.setState({
            inputBody : event.target.value
        })
    }
    onPost = async (event) => {

        event.preventDefault()

        this.setState({
            inputTitle:'',
            inputBody:''
        })

        const putTitle = this.title.value
        const putBody = this.title.value
        var post = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: putTitle,
            body: putBody,
            userId: 1
        })

        console.log(post)

    }

    renderPosts = () => {
        var render = this.state.list.map(el => {
            return (
                <div key={el.id}>
                    <div>
                        userid : {el.userId}
                    </div>
                    <div>
                        Title : {el.title}
                    </div>
                    <div>
                        Content : {el.body}
                    </div>
                    <br></br> <br></br>
                </div> 
            )
            
        })
        return render
    }

    render() {
        return (
            this.state.isLoading ? <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div> :
            <div>
                <div>
                   
                    {/* bikin form login dan register*/}
                    <div className='row'>
                        <div className='col-12 col-md-6 col-sm-12'>
                            <h1 className='text-center'>POST</h1>

                            <div className='container'>

                                <form onSubmit={this.onPost}>
                                    <label className='ml-auto'><b>Title</b></label>
                                    <input value={this.state.inputTitle} onChange={this.onChangetitle} ref={input => this.title = input} type='text' className='form-control' placeholder='Enter registered email' name='body' required></input>
                                    <br />
                                
                                    <label className='ml-auto'><b>What's in your mind?</b></label>
                                    <textarea value = {this.state.inputBody} onChange={this.onChangebody} ref={input => this.body = input} type='text' className='form-control' placeholder='write something' name='body' required></textarea>
                                </form>
                                <br />
                                <button onClick={this.onPost} className='col btn btn-dark mr-3'>POST</button>

                            </div>

                        </div>
                       
                    </div>
                </div>

                <div className='mt-4 container'>
                    {this.renderPosts()}
                </div>
            </div>
        )
    }
}

export default List