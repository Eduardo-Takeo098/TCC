import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  
  image1: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  title1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3AC9CC',
    width: '70%',
    marginLeft: 25,
    textAlign: 'center',
    marginTop: 150,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },

  button1: {
    backgroundColor: '#fff',
    width: 200,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  courseListBackground: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  courseListImage: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  courseListTitle: {
    color: '#345c74',
    fontSize: 13,
    paddingHorizontal: 20,
    width: 170,
  },
  courseListSubtitle: {
    color: '#f58084',
    fontSize: 12,
    paddingHorizontal: 20,
  },
  
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
    backgroundColor: '#3AC9CC',
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
