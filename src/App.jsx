import { Switch } from 'solid-js';

import CloseIcon from './components/icons/CloseIcon';
import { MatchRoute } from '@rturnq/solid-router';
import MaximizeIcon from './components/icons/MaximizeIcon';

function App() {
  return (
    <div class="dark">
      <div class="flex flex-col w-screen h-screen text-black bg-white dark:text-white dark:bg-gray-900">
        <div
          class={
            'flex justify-between items-center w-full bg-gray-800'
          }
          style={{ '-webkit-app-region': 'drag' }}
        >
          <div class="px-1 text-gray-400 font-bold">Thunder Messenger</div>
          <div
            class={'flex items-center'}
            style={{ '-webkit-app-region': 'no-drag' }}
          >
            <div
              class={
                'flex flex-col w-6 h-6 justify-center items-center p-2 hover:bg-gray-700 cursor-pointer'
              }
              onClick={() => {
                send('minimizeWindow');
              }}
            >
              <div class={'w-2 h-[1px] rounded-full bg-white'}></div>
            </div>
            <div
              class={
                'flex flex-col w-6 h-6 justify-center items-center p-2 hover:bg-gray-700 cursor-pointer'
              }
              onClick={() => {
                send('toggleMaximizeWindow');
              }}
            >
              <MaximizeIcon />
            </div>
            <div
              class={
                'flex flex-col w-6 h-6 justify-center items-center p-2 hover:bg-red-500 cursor-pointer'
              }
              onClick={() => {
                send('closeWindow');
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <Switch>
          <MatchRoute path="/">
            Hello World
          </MatchRoute>
        </Switch>
      </div>
    </div>
  );
}

export default App;
