import * as types from '../constants/ActionTypes';
import * as API from '../constants/Api';


import {push} from 'react-router-redux';
import $ from 'jquery';
export function pushRedirect(path) {
    return dispatch => {
        dispatch(push(path))
    }
}




export function search(data){
    //let self = this;
    //const {nameArtist, currentCategory, currentEntity, limitList} = self.state
    this.setState({isLoaded:false});
    if(nameArtist.length > 0){
        $.ajax({
            url:API.MAIN_API_URL,
            data:{term:nameArtist, entity:currentEntity, media:currentCategory, limit:limitList},
            type:"GET",
            dataType: "jsonp",
            success: function(data, dataType){
                let results = data.results
                console.log(data);

                //self.setState({searchingList:data})
                if(data.results.length > 0){
                    //self.setState({isLoaded:true, resultSearching:data});
                }else if(data.results.length == 0){
                   // self.setState({isLoaded:'wasLoad', resultSearching:data});
                }

            }
        })
    }else{
        this.setState({isLoaded:'needName'});
        console.log(error, 'needName')
    }

}

export function requestApiResult() {
    return {
        type: types.REQUEST_API_RESULT
    };
}

export function receiveApiResult(payload) {
    return {
        type: types.RECEIVE_API_RESULT,
        payload
    };
}