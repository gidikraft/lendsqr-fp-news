import {Theme} from '@/theme';
import {createBox} from '@shopify/restyle';

const Box = createBox<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>;

export default Box;
