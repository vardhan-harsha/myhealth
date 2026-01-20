import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    return (
        <NativeTabs minimizeBehavior="onScrollDown">
            <NativeTabs.Trigger name="index">
                <Icon sf="house.fill" />
                <Label>Home</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="vitals">
                <Icon sf="heart.text.square.fill" />
                <Label>Vitals</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="habits">
                <Icon sf="bolt.fill" />
                <Label>Habits</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="progress">
                <Icon sf="chart.line.uptrend.xyaxis" />
                <Label>Progress</Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="profile">
                <Icon sf="person.fill" />
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
