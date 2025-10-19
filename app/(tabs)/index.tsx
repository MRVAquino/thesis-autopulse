import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const accent = Colors.light.tint;

  const dashboardItems = [
    {
      title: 'Engine Status',
      description: 'Monitor engine performance and diagnostics',
      icon: 'gear',
      route: '/(tabs)/engine',
      color: '#0a7ea4'
    },
    {
      title: 'Fuel Management',
      description: 'Track fuel consumption and efficiency',
      icon: 'fuelpump',
      route: '/(tabs)/fuel',
      color: '#0a7ea4'
    },
    {
      title: 'Emissions Tracking',
      description: 'Monitor environmental impact and compliance',
      icon: 'leaf',
      route: '/(tabs)/emissions',
      color: '#0a7ea4'
    }
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <Ionicons name="car-sport" size={22} color={accent} />
          <ThemedText style={styles.brand}>AutoPulse</ThemedText>
        </View>
        <Pressable accessibilityRole="button" onPress={() => router.push('/profile')} hitSlop={8}>
          <Ionicons name="person-circle-outline" size={26} color="#2c3e50" />
        </Pressable>
      </View>

      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Dashboard</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Monitor your vehicle&apos;s performance</ThemedText>
      </View>

      <View style={styles.dashboardGrid}>
        {dashboardItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dashboardCard}
            onPress={() => handleNavigation(item.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <IconSymbol name={item.icon as any} size={32} color="white" />
            </View>
            <View style={styles.cardContent}>
              <ThemedText type="subtitle" style={styles.cardTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickStats}>
        <ThemedText type="subtitle" style={styles.statsTitle}>Quick Overview</ThemedText>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <IconSymbol name="speedometer" size={24} color="#0a7ea4" />
            <ThemedText style={styles.statValue}>N/A</ThemedText>
            <ThemedText style={styles.statLabel}>Engine Health</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="gauge" size={24} color="#0a7ea4" />
            <ThemedText style={styles.statValue}>N/A</ThemedText>
            <ThemedText style={styles.statLabel}>Avg Consumption</ThemedText>
          </View>
          <View style={styles.statCard}>
            <IconSymbol name="leaf" size={24} color="#0a7ea4" />
            <ThemedText style={styles.statValue}>N/A</ThemedText>
            <ThemedText style={styles.statLabel}>Emissions</ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F1F6',
  },
  header: {
    padding: 20,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#E9F1F6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#E9F1F6',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#16445A',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    color: '#16445A',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7d86',
  },
  dashboardGrid: {
    padding: 20,
    gap: 16,
    backgroundColor: '#E9F1F6',
  },
  dashboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E6E9ED',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
    color: '#123B4A',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7d86',
  },
  quickStats: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#E9F1F6',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    color: '#123B4A',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E6E9ED',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
    color: '#123B4A',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7d86',
    textAlign: 'center',
  },
});
