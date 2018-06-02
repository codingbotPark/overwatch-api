import test from 'ava';
import { getStats } from '../../src/parser';

const platform = 'pc'
const region = 'us'
const tag = 'Calvin-1337'

var result;

test.before.cb(t => {
  getStats(platform, region, tag, (json) => {
    result = json;
    t.end();
  })
});

test('get base information of user profile', t => {
  t.deepEqual(typeof(result.username), 'string');
  t.deepEqual(typeof(result.level), 'number');
  t.deepEqual(result.portrait.startsWith('http'), true);
});

test('get user top heroes information', t => {
  const topHeroCategories = {
    'played': '0x0860000000000021',
    'games_won': '0x0860000000000039',
    'win_rate': '0x08600000000003D1',
  };

  Object.keys(topHeroCategories).forEach((k) => {
    result['stats']['top_heroes']['quickplay'][k].map((hero) => {
      t.deepEqual(typeof(hero['hero']), 'string');
      t.deepEqual(typeof(hero[k]), 'string');
      t.deepEqual(hero.img.startsWith('http'), true);
    });
  });

  Object.keys(topHeroCategories).forEach((k) => {
    result['stats']['top_heroes']['competitive'][k].map((hero) => {
      t.deepEqual(typeof(hero['hero']), 'string');
      t.deepEqual(typeof(hero[k]), 'string');
      t.deepEqual(hero.img.startsWith('http'), true);
    });
  });
});

test('get combat stats', t => {
  t.is(result['stats']['combat']['quickplay'].length > 0, true);
  result['stats']['combat']['quickplay'].map((stat) => {
    t.deepEqual(typeof(stat.title), 'string');
    t.deepEqual(typeof(stat.value), 'string');
  });

  t.is(result['stats']['combat']['competitive'].length > 0, true);
  result['stats']['combat']['competitive'].map((stat) => {
    t.deepEqual(typeof(stat.title), 'string');
    t.deepEqual(typeof(stat.value), 'string');
  });
});

test.skip('get death stats', t => {
  t.is(result['stats']['deaths']['quickplay'].length > 0, true);
  result['stats']['deaths']['quickplay'].map((stat) => {
    t.deepEqual(typeof(stat.title), 'string');
    t.deepEqual(typeof(stat.value), 'string');
  });

  t.is(result['stats']['deaths']['competitive'].length > 0, true);
  result['stats']['deaths']['competitive'].map((stat) => {
    t.deepEqual(typeof(stat.title), 'string');
    t.deepEqual(typeof(stat.value), 'string');
  });
});

