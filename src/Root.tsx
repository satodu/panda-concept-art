import React from 'react';
import {Composition, Folder} from 'remotion';
import {OrientalIntro} from './oriental/OrientalIntro';
import {OrientalUi} from './oriental/OrientalUi';
import {OrientalBanner} from './oriental/OrientalBanner';
import {OrientalLogo} from './oriental/OrientalLogo';
import {OrientalSocial} from './oriental/OrientalSocial';
import {OrientalComponents} from './oriental/OrientalComponents';
import {GaldrIntro} from './galdr/GaldrIntro';
import {GaldrUi} from './galdr/GaldrUi';
import {GaldrMobile} from './galdr/GaldrMobile';
import {GaldrLogo} from './galdr/GaldrLogo';
import {GaldrSocial} from './galdr/GaldrSocial';
import {GaldrComponents} from './galdr/GaldrComponents';
import {GaldrKit} from './galdr/GaldrKit';
import {ShizukaIntro} from './shizuka/ShizukaIntro';
import {ShizukaUi} from './shizuka/ShizukaUi';
import {ShizukaFocus} from './shizuka/ShizukaFocus';
import {ShizukaLogo} from './shizuka/ShizukaLogo';
import {ShizukaSocial} from './shizuka/ShizukaSocial';
import {ShizukaComponents} from './shizuka/ShizukaComponents';
import {ShizukaKanji} from './shizuka/ShizukaKanji';
import {Showcase} from './dev/Showcase';
import oriental from '../oriental-brutalismo/tokens/tokens.json';
import galdr from '../galdr/tokens/tokens.json';
import shizuka from '../shizuka/tokens/tokens.json';

const FPS = 30;
const HD = {fps: FPS, width: 1920, height: 1080} as const;
const POST = {fps: FPS, width: 1080, height: 1350} as const;

// Every composition takes `primary`. Change it in the Studio props panel or with
// --props='{"primary":"#F59E0B"}' and the whole art follows.
export const Root: React.FC = () => (
  <>
    <Composition id="Dev-Showcase" component={Showcase} durationInFrames={1} fps={FPS} width={1400} height={1100} defaultProps={{src: ''}} />
    <Folder name="oriental-brutalismo">
      <Composition id="Oriental-Intro" component={OrientalIntro} durationInFrames={170} {...HD} defaultProps={{primary: oriental.color.primary}} />
      <Composition id="Oriental-Ui" component={OrientalUi} durationInFrames={240} {...HD} defaultProps={{primary: oriental.color.primary}} />
      <Composition id="Oriental-Components" component={OrientalComponents} durationInFrames={210} {...HD} defaultProps={{primary: oriental.color.primary}} />
      <Composition id="Oriental-Logo" component={OrientalLogo} durationInFrames={130} {...HD} defaultProps={{primary: oriental.color.primary}} />
      <Composition id="Oriental-Banner" component={OrientalBanner} durationInFrames={120} fps={FPS} width={1500} height={500} defaultProps={{primary: oriental.color.primary, title: 'YOUR TITLE', subtitle: 'Design system // dev tools // architecture'}} />
      <Composition id="Oriental-Social" component={OrientalSocial} durationInFrames={120} {...POST} defaultProps={{primary: oriental.color.primary, headline: 'NEW RELEASE', issue: '#07'}} />
    </Folder>
    <Folder name="galdr">
      <Composition id="Galdr-Intro" component={GaldrIntro} durationInFrames={180} {...HD} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Ui" component={GaldrUi} durationInFrames={240} {...HD} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Components" component={GaldrComponents} durationInFrames={240} {...HD} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Kit" component={GaldrKit} durationInFrames={240} {...HD} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Logo" component={GaldrLogo} durationInFrames={140} {...HD} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Mobile" component={GaldrMobile} durationInFrames={150} fps={FPS} width={1080} height={1920} defaultProps={{primary: galdr.color.primary}} />
      <Composition id="Galdr-Social" component={GaldrSocial} durationInFrames={120} {...POST} defaultProps={{primary: galdr.color.primary, title: 'AMETHYST CLUSTER.', quote: 'The color comes from irradiated iron in the crystal structure.'}} />
    </Folder>
    <Folder name="shizuka">
      <Composition id="Shizuka-Intro" component={ShizukaIntro} durationInFrames={220} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Focus" component={ShizukaFocus} durationInFrames={300} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Components" component={ShizukaComponents} durationInFrames={270} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Ui" component={ShizukaUi} durationInFrames={300} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Logo" component={ShizukaLogo} durationInFrames={160} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Kanji" component={ShizukaKanji} durationInFrames={360} {...HD} defaultProps={{primary: shizuka.color.primary}} />
      <Composition id="Shizuka-Social" component={ShizukaSocial} durationInFrames={150} {...POST} defaultProps={{primary: shizuka.color.primary, quote: 'rest first. the rest can wait.'}} />
    </Folder>
  </>
);
