import {loadFont as loadArchivo} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as loadSpace} from '@remotion/google-fonts/SpaceGrotesk';
import {loadFont as loadJetBrains} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as loadNotoJp} from '@remotion/google-fonts/NotoSansJP';
import {loadFont as loadBigShoulders} from '@remotion/google-fonts/BigShoulders';
import {loadFont as loadShippori} from '@remotion/google-fonts/ShipporiMincho';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadInterTight} from '@remotion/google-fonts/InterTight';
import {loadFont as loadPlexMono} from '@remotion/google-fonts/IBMPlexMono';
import {loadFont as loadRunic} from '@remotion/google-fonts/NotoSansRunic';
import {loadFont as loadSourceSerif} from '@remotion/google-fonts/SourceSerif4';

export const fonts = {
  archivo: loadArchivo().fontFamily,
  space: loadSpace().fontFamily,
  jetbrains: loadJetBrains().fontFamily,
  notoJp: loadNotoJp('normal', {weights: ['300', '400', '700'], subsets: ['japanese', 'latin']}).fontFamily,
  bigShoulders: loadBigShoulders('normal', {weights: ['600', '800'], subsets: ['latin']}).fontFamily,
  shippori: loadShippori('normal', {weights: ['400', '700'], subsets: ['japanese', 'latin']}).fontFamily,
  inter: loadInter('normal', {weights: ['300', '400', '500'], subsets: ['latin']}).fontFamily,
  interTight: loadInterTight('normal', {weights: ['200', '300'], subsets: ['latin']}).fontFamily,
  runic: loadRunic('normal', {weights: ['400'], subsets: ['runic', 'latin']}).fontFamily,
  sourceSerif: loadSourceSerif('normal', {weights: ['400', '600'], subsets: ['latin']}).fontFamily,
  plexMono: loadPlexMono('normal', {weights: ['400', '500'], subsets: ['latin']}).fontFamily,
};
