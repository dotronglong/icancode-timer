# icancode-timer

## How to use

```javascript
import {Timer} from '@icancode/timer';

const timer = new Timer();
timer.tick();
timer.tock('Start application');
timer.tock('Query database');
timer.tock('Push data to cache');
```