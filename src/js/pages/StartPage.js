import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field} from 'redux-form';
import fecha from 'fecha';
import FormWr from '../components/FormWr/FormWr';
import Button from '../components/Button/Button';
import  Spinner from '../components/Spinner/Spinner';


import $ from "jquery"
import  {renderTextField, renderDropdownList, renderDropdownListSaveChange} from '../components/Fields/Fields';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class StartPage extends Component {
    constructor(props) {
        super(props);
        // this.store = this.props.store;
        this.state = {
            isLoginOpened: false,
            isLoaded: true,
            selectGroup: 'name',
            categories:['all', 'audiobook', 'ebook', 'movie', 'music', 'musicVideo', 'podcast', 'tvShow', 'shortFilm', 'software'],
            categoriesEntities:{
                    movie:['movieArtist', 'movie'],
                    podcast:['podcastAuthor', 'podcast'],
                    music:['musicArtist', 'musicTrack', 'album', 'musicVideo', 'mix'],
                    musicVideo:['musicArtist', 'musicVideo'],
                    audiobook:['audiobookAuthor', 'audiobook'],
                    shortFilm:['shortFilmArtist', 'shortFilm', 'album', 'musicVideo', 'mix'],
                    tvShow:['tvEpisode', 'tvSeason'],
                    software:['software', 'iPadSoftware', 'macSoftware'],
                    ebook:['ebook'],
                    all:['movie', 'album', 'allArtist', 'podcast', 'musicVideo', 'mix', 'audiobook', 'tvSeason', 'allTrack'],
            },
            nameArtist:'',
            currentCategory: 'all',
            currentEntity:'',
            limitList:'',
            resultSearching: {
                results:[]
            },

        }
    }

    componentDidMount() {

    }


    getMedia(str) {
        if (str.indexOf(' ') === -1) {
            return str.toLowerCase();
        }
        const sg = str.split(' ');
        return sg[0] + capitalize(sg[1]);
    }


    saveName(e){
        let name = e.target.value

        this.setState({nameArtist:name});
    }
    saveLimit(e){
        let limit = e.target.value

        this.setState({limitList:limit});
    }
    click(res){
        /*let media = this.state.currentCategory;
        let nameArtist = this.state.nameArtist;

        let jSonString = `http://itunes.apple.com/search?media=${media}&term=2&country=it&limit=15&attribute=genreIndex&entity=song&callback=?`
        //let jSonString = `https://itunes.apple.com/search?media=${media}&term=${nameArtist.split(' ').join('+')}`

        console.log(jSonString)
        var self = this
        function foo(){
            self.setState({isLoaded:false});
            return (
                $.getJSON(jSonString,function(data) {
                    console.log('123',data)
                    if(data.results.length > 0){
                        self.setState({isLoaded:true, resultSearching:data});
                    }else if(data.results.length == 0){
                        self.setState({isLoaded:'wasLoad', resultSearching:data});
                    }
                })
            )
        }

        foo().done(function(result){
            console.log(result)


        })*/




        {/*<script type="text/javascript">
            var dataReceiver = function(response) {
                console.log(response);
                //window.data = response;
            }
        </script>

        <script src="https://itunes.apple.com/search?term=jim+jones&country=ca&callback=dataReceiver"></script>*/}

    }

    search(){
        let self = this;
        const {nameArtist, currentCategory, currentEntity, limitList} = self.state
        this.setState({isLoaded:false});
        if(nameArtist.length > 0){
            $.ajax({
                url:"http://itunes.apple.com/search",
                data:{term:nameArtist, entity:currentEntity, media:currentCategory, limit:limitList},
                type:"GET",
                dataType: "jsonp",
                success: function(data, dataType){
                    let results = data.results
                    console.log(data);

                    //self.setState({searchingList:data})
                    if(data.results.length > 0){
                        self.setState({isLoaded:true, resultSearching:data});
                    }else if(data.results.length == 0){
                        self.setState({isLoaded:'wasLoad', resultSearching:data});
                    }

                }
            })
        }else{
            this.setState({isLoaded:'needName'});
            console.log(error, 'needName')
        }

    }



    render() {
        let categories = this.state.categories;
        let currentCategory = this.state.currentCategory;
        let searchingList = this.state.resultSearching.results;
        let isLoaded = this.state.isLoaded;

        let categoriesEntities = this.state.categoriesEntities[currentCategory]
        let currentEntity = this.state.currentEntity;

        console.log('searchingList', searchingList);
        return (
            <div className={`page start-page ${this.state.isLoginOpened ? 'step2' : ''}`}>




                    <div className="search-form">
                        <h3>itunes search</h3>
                        <FormWr title=""
                                description=""
                                onSubmit={::this.click}
                                autoComplete="off"
                                buttonText="пошук"
                                key="step1">

                                <div className="input-box">
                                    <input
                                        type="text"
                                        onKeyUp={::this.saveName}
                                        placeholder="Artist name"
                                        autoFocus
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        onKeyUp={::this.saveLimit}
                                        placeholder="Limit list"
                                        autoFocus
                                    />
                                </div>




                                <Field
                                    name="currentCategory"
                                    component={renderDropdownListSaveChange}
                                    data={categories}
                                    valueField="id"
                                    textField="name"
                                    placeholder="Category"
                                    valueCurrent={currentCategory}
                                    onChange={value => this.setState({currentCategory: value, currentEntity:''})}
                                    //onChange={::this.saveShop}
                                />
                                <Field
                                    name="currentEntities"
                                    component={renderDropdownListSaveChange}
                                    data={categoriesEntities}
                                    valueField="id"
                                    textField="name"
                                    placeholder="Category entity"
                                    valueCurrent={currentEntity}
                                    onChange={value => this.setState({currentEntity: value})}
                                    //onChange={::this.saveShop}
                                />


                                <Button type={'white'}
                                    onClick={::this.search}
                                    children="search"/>
                        </FormWr>

                    </div>



                    <div className="search-list">

                        {
                             isLoaded == true &&(
                                <ul className=''>
                                    {
                                        searchingList.map((item) => {
                                        return (
                                            <li key = {item.trackName}>
                                                <a href={item.collectionViewUrl} target="_blank">
                                                    <div className="image-view">
                                                        <img  src={item.artworkUrl100.replace('100x100', '1200x1200') || item.artworkUrl100} alt="image"/>
                                                    </div>
                                                    <div className="about-view">
                                                        <h4>{item.trackName}</h4>
                                                        <div className="type-content">
                                                            <p><span>{item.artistName}</span></p>
                                                            <span>{item.kind}</span>
                                                        </div>
                                                        <div className="price-view">
                                                            <p>${item.trackPrice}</p>
                                                            <p>{fecha.format(new Date(item.releaseDate), 'MMM D, YYYY')}</p>

                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        )
                                        })
                                    }
                                </ul>

                            )
                        }
                        {
                            isLoaded == false &&(
                                <Spinner></Spinner>

                            )
                        }
                        {
                            isLoaded == "wasLoad" &&(
                               <p>
                                   iTunes haven't this content. Please, try other categories.
                               </p>

                            )
                        }
                        {
                            isLoaded == "needName" &&(
                                <p>
                                    Search field is not filled. Please, write something.
                                </p>

                            )
                        }

                    </div>

                </div>

        )
    }
};
