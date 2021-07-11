import { Component } from 'react';
import { fill } from 'lodash';
import { add } from './util';

const res = fill([1, 2, 3], add(10, 20));
console.log('this is index2', { res, Component });
