import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: '#888',
  },
  detailsButton: {
    marginBottom: 24,
    alignItems: 'center',
  },
  detailsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#FF5F58',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
