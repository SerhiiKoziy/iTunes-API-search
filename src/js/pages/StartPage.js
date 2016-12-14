import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field} from 'redux-form';
import fecha from 'fecha';
import FormWr from '../components/FormWr/FormWr';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';



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
        this.state = {
            isLoginOpened: false,
            isLoaded: false,
            selectGroup: 'name',

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


    searchForm(){
        let {nameArtist, currentCategory, currentEntity, limitList} = this.state;
        let data = {nameArtist, currentCategory, currentEntity, limitList}
        console.log('searchForm', data)
        this.props.actions.search(data);
    }


    saveName(e){
        let name = e.target.value

        this.setState({nameArtist:name});
    }
    saveLimit(e){
        let limit = e.target.value

        this.setState({limitList:limit});
    }
    click(res) {

    }


    render() {

        let currentCategory = this.state.currentCategory;
        let currentEntity = this.state.currentEntity;
        let searchingList;
        let isLoaded = this.props.data.isLoaded;
        let categories = this.props.data.categories;
        let categoriesEntities = this.props.data.categoriesEntities[currentCategory]


        if(isLoaded == true ){
            searchingList = this.props.data.result;
        }

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
                                    onClick={::this.searchForm}
                                    children="search"/>
                        </FormWr>

                    </div>



                    <div className="search-list">

                        {
                             isLoaded == true &&(
                                <ul className=''>
                                    {
                                        searchingList.map((item, index) => {
                                        return (
                                            <li key = {index}>
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
