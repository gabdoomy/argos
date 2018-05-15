import 'raf/polyfill'
import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { SearchPage, Item, Jumbotron, FilterCard } from './SearchPage'

describe('SearchPage', () => {
  const buildPageObject = () => {
    var mockState = {
        rating: 0
    }
    const wrapper = shallow(<SearchPage />)
    const jumbotronWrapper = shallow(<Jumbotron />)
    const filterCardWrapper = shallow(<FilterCard state={mockState} changeRating={function(){}}/>)
    const pageObject = {
      getSpecificationTitle: () => jumbotronWrapper.find('.page-title').text(),
      getItems: () => wrapper.find('.card'),
      getFilterCard: () => filterCardWrapper.find('.affix'),
      isLoadingDisplayed: () => wrapper.html().includes('Loading')
    }
    return pageObject
  }

  const buildPageObjectWithItems = () => {
    const wrapper = shallow(<SearchPage />)
    wrapper.setState({ productList: '[{"id":"10","type":"product","attributes":{"name":"Playmobil","price":14.99,"avgRating":4.90,"reviewsCount":8}}]' });
    const pageObject = {
      isItemDisplayed: () => wrapper.html().includes('Playmobil'),
      isLoadingDisplayed: () => wrapper.html().includes('Loading')
    }
    return pageObject
  }

  const buildItemObject = () => {
    const wrapper = shallow(<Item />)
    const pageObject = {
      getItems: () => wrapper.find('.card')
    }
    return pageObject
  }

  test('should have the correct heading', () => {
    const component = buildPageObject()
    const expectValue = component.getSpecificationTitle()
    expect(expectValue).toBe('Argos Search Page');
  });

  test('should create filter card', () => {
    const component = buildPageObject();
    const expectValue = component.getFilterCard();
    expect(expectValue.length).toBe(1);
  });

  test('should have no items displayed initially', () => {
    const component = buildPageObject();
    expect(component.isLoadingDisplayed()).toBe(true);
  });

   test('should display items when data is loaded', () => {
    const component = buildPageObjectWithItems();
    expect(component.isLoadingDisplayed()).toBe(false);
    expect(component.isItemDisplayed()).toBe(true);
  });

  test('should create item', () => {
    const component = buildItemObject();
    const expectValue = component.getItems();
    expect(expectValue.length).toBe(1);
  });
})
