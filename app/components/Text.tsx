import {Theme} from '@/theme';
import {createText} from '@shopify/restyle';

const Text = createText<Theme>();

export type TextProps = React.ComponentProps<typeof Text>;

export default Text;
