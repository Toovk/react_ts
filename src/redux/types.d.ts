/*
 * @Description: 
 * @Author: Sheep
 * @Date: 2022-01-20 11:58:01
 * @LastEditTime: 2022-01-20 18:32:12
 * @LastEditors: Sheep
 */

import { StateType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./store').default>

  export type RootState = StateType<typeof import('./reducer').default>;
  
  export type RootAction = ActionType<typeof import('./actions').default>
}


