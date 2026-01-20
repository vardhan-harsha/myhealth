import { Text } from 'react-native';
import { cn } from '~/lib/utils';

interface TextProps extends React.ComponentPropsWithoutRef<typeof Text> {
    className?: string;
}

function ButtonText({ className, ...props }: TextProps) {
    return (
        <Text
            className={cn('text-sm native:text-base font-medium text-primary-foreground', className)}
            {...props}
        />
    );
}

export { ButtonText };
