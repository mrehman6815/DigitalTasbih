import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;

const FAQsScreen = ({navigation}) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is Digital Tasbih?",
      answer: "Digital Tasbih is a mobile application designed to help Muslims track their daily tasbih (prayer counter) counts, maintain streaks, and manage their spiritual practices. It provides a digital alternative to physical tasbih beads."
    },
    {
      id: 2,
      question: "How do I start counting tasbih?",
      answer: "1. Tap 'Start Tasbih' from the home screen\n2. Select a predefined tasbih (Subhanallah, Alhamdulillah, etc.) or create a custom one\n3. Tap the screen to count\n4. Press 'Stop & Save' when finished"
    },
    {
      id: 3,
      question: "Can I create my own custom tasbih?",
      answer: "Yes! You can create custom tasbihs by tapping '+ Add New Tasbih' in the tasbih selection screen. Enter your desired tasbih name and it will be added to your list. Custom tasbihs can be deleted, but predefined ones cannot."
    },
    {
      id: 4,
      question: "How does the streak system work?",
      answer: "The streak system tracks your daily consistency. Each time you use a tasbih on consecutive days, your streak increases. If you miss a day, your streak resets. This helps you maintain regular spiritual practices."
    },
    {
      id: 5,
      question: "Is my data private and secure?",
      answer: "Absolutely! All your data (tasbih counts, streaks, custom tasbihs) is stored locally on your device. We do not collect, store, or transmit any of your personal information to external servers. Your privacy is our priority."
    },
    {
      id: 6,
      question: "How do I change my profile picture?",
      answer: "Go to Settings → Profile Settings → tap on your profile picture → this will take you to the avatar selection screen where you can choose a new avatar and update your name."
    },
    {
      id: 7,
      question: "Can I delete all my data?",
      answer: "Yes, you can remove all your data by going to Settings → Data Management → Remove All Data. A confirmation modal will appear to ensure you want to proceed, as this action cannot be undone."
    },
    {
      id: 8,
      question: "Does the app work offline?",
      answer: "Yes! Digital Tasbih works completely offline. Since all data is stored locally on your device, you don't need an internet connection to use any of the app's features."
    },
    {
      id: 9,
      question: "How do I reset my tasbih counts?",
      answer: "Currently, you can reset individual tasbih counts by deleting and recreating custom tasbihs, or use the 'Remove All Data' feature to reset everything. We're working on adding individual reset options in future updates."
    },
    {
      id: 10,
      question: "Is the app suitable for children?",
      answer: "Yes, Digital Tasbih is suitable for users of all ages. It's a simple, educational tool that can help children learn about tasbih and develop good spiritual habits. We encourage parental guidance for young users."
    },
    {
      id: 11,
      question: "Can I use multiple tasbihs in one session?",
      answer: "You can use different tasbihs, but only one at a time. After finishing one tasbih session, you can start another with a different tasbih. Each tasbih maintains its own count and streak separately."
    },
         {
       id: 12,
       question: "How do I contact support?",
       answer: "For support or questions, please contact us:\n\n• Email: umohammad552@gmail.com\n• WhatsApp: 03039223651\n\nYou can also reach us through the app store (Google Play Store or Apple App Store) where you downloaded the app. We'll respond to your inquiries as soon as possible."
     }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.titleText}>FAQs</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.subtitle}>Find answers to common questions about Digital Tasbih</Text>
            
            {faqs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(faq.id)}
                  activeOpacity={0.7}>
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <Icon 
                    name={expandedFAQ === faq.id ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#0a5c36" 
                  />
                </TouchableOpacity>
                
                {expandedFAQ === faq.id && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Still Have Questions?</Text>
            <Text style={styles.paragraph}>
              If you couldn't find the answer you're looking for, please contact us:
            </Text>
            <Text style={styles.paragraph}>
              • Email: umohammad552@gmail.com{'\n'}
              • WhatsApp: 03039223651
            </Text>
            <Text style={styles.paragraph}>
              You can also reach us through the app store where you downloaded Digital Tasbih. We're here to help!
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8',
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 20,
    backgroundColor: '#E8F4F8',
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a5c36',
    borderWidth: 0,
    borderRadius: 25,
    height: 70,
    width: width - HORIZONTAL_PADDING * 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  titleText: {
    flex: 1,
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    letterSpacing: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answerText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default FAQsScreen; 