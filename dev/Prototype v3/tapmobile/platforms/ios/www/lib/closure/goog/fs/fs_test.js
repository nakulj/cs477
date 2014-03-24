// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.fsTest');
goog.setTestOnly('goog.fsTest');

goog.require('goog.array');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.fs');
goog.require('goog.fs.DirectoryEntry');
goog.require('goog.fs.Error');
goog.require('goog.fs.FileReader');
goog.require('goog.fs.FileSaver');
goog.require('goog.string');
goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');

var TEST_DIR = 'goog-fs-test-dir';

var fsExists = goog.isDef(goog.global.requestFileSystem) ||
    goog.isDef(goog.global.webkitRequestFileSystem);
var deferredFs = fsExists ? goog.fs.getTemporary() : null;
var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();
asyncTestCase.stepTimeout = 5000;
var stubs = new goog.testing.PropertyReplacer();

function setUpPage() {
  if (!fsExists) {
    return;
  }

  loadTestDir().addErrback(function(err) {
    var msg;
    if (err.code == goog.fs.Error.ErrorCode.QUOTA_EXCEEDED) {
      msg = err.message + '. If you\'re using Chrome, you probably need to ' +
          'pass --unlimited-quota-for-files on the command line.';
    } else if (err.code == goog.fs.Error.ErrorCode.SECURITY &&
               window.location.href.match(/^file:/)) {
      msg = err.message + '. file:// URLs can\'t access the filesystem API.';
    } else {
      msg = err.message;
    }
    var body = goog.dom.getDocument().body;
    goog.dom.insertSiblingBefore(
        goog.dom.createDom('h1', {}, msg), body.childNodes[0]);
  });
}

function tearDown() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      addCallback(function(dir) { return dir.removeRecursively(); }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('removing filesystem');
}

function testUnavailableTemporaryFilesystem() {
  stubs.set(goog.global, 'requestFileSystem', null);
  stubs.set(goog.global, 'webkitRequestFileSystem', null);
  asyncTestCase.waitForAsync('testUnavailableTemporaryFilesystem');

  goog.fs.getTemporary(1024).addErrback(function(e) {
    assertEquals('File API unsupported', e.message);
    continueTesting();
  });
}


function testUnavailablePersistentFilesystem() {
  stubs.set(goog.global, 'requestFileSystem', null);
  stubs.set(goog.global, 'webkitRequestFileSystem', null);
  asyncTestCase.waitForAsync('testUnavailablePersistentFilesystem');

  goog.fs.getPersistent(2048).addErrback(function(e) {
    assertEquals('File API unsupported', e.message);
    continueTesting();
  });
}


function testIsFile() {
  if (!fsExists) {
    return;
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(function(fileEntry) {
        assertFalse(fileEntry.isDirectory());
        assertTrue(fileEntry.isFile());
      }).addBoth(continueTesting);
  asyncTestCase.waitForAsync('testIsFile');
}

function testIsDirectory() {
  if (!fsExists) {
    return;
  }

  loadDirectory('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(function(fileEntry) {
        assertTrue(fileEntry.isDirectory());
        assertFalse(fileEntry.isFile());
      }).addBoth(continueTesting);
  asyncTestCase.waitForAsync('testIsDirectory');
}

function testReadFileUtf16() {
  if (!fsExists) {
    return;
  }
  var str = 'test content';
  var buf = new ArrayBuffer(str.length * 2);
  var arr = new Uint16Array(buf);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, arr.buffer)).
      addCallback(goog.partial(checkFileContentWithEncoding, str, 'UTF-16')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testReadFile');
}

function testReadFileUtf8() {
  if (!fsExists) {
    return;
  }
  var str = 'test content';
  var buf = new ArrayBuffer(str.length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i) & 0xff;
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, arr.buffer)).
      addCallback(goog.partial(checkFileContentWithEncoding, str, 'UTF-8')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testReadFileUtf8');
}

function testReadFileAsArrayBuffer() {
  if (!fsExists) {
    return;
  }
  var str = 'test content';
  var buf = new ArrayBuffer(str.length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i) & 0xff;
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, arr.buffer)).
      addCallback(goog.partial(checkFileContentAs, arr.buffer, 'ArrayBuffer',
          undefined)).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testReadFileAsArrayBuffer');
}

function testReadFileAsBinaryString() {
  if (!fsExists) {
    return;
  }
  var str = 'test content';
  var buf = new ArrayBuffer(str.length);
  var arr = new Uint8Array(buf);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, arr.buffer)).
      addCallback(goog.partial(checkFileContentAs, str, 'BinaryString',
          undefined)).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testReadFileAsArrayBuffer');
}

function testWriteFile() {
  if (!fsExists) {
    return;
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, 'test content')).
      addCallback(goog.partial(checkFileContent, 'test content')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testWriteFile');
}

function testRemoveFile() {
  if (!fsExists) {
    return;
  }

  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, 'test content')).
      addCallback(function(file) { return file.remove(); }).
      addCallback(goog.partial(checkFileRemoved, 'test')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testRemoveFile');
}

function testMoveFile() {
  if (!fsExists) {
    return;
  }

  var deferredSubdir = loadDirectory(
      'subdir', goog.fs.DirectoryEntry.Behavior.CREATE);
  var deferredWrittenFile =
      loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(goog.partial(writeToFile, 'test content'));
  goog.async.DeferredList.gatherResults([deferredSubdir, deferredWrittenFile]).
      addCallback(splitArgs(function(dir, file) { return file.moveTo(dir); })).
      addCallback(goog.partial(checkFileContent, 'test content')).
      addCallback(goog.partial(checkFileRemoved, 'test')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testMoveFile');
}

function testCopyFile() {
  if (!fsExists) {
    return;
  }

  var deferredFile = loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE);
  var deferredSubdir = loadDirectory(
      'subdir', goog.fs.DirectoryEntry.Behavior.CREATE);
  var deferredWrittenFile = deferredFile.branch().
      addCallback(goog.partial(writeToFile, 'test content'));
  goog.async.DeferredList.gatherResults([deferredSubdir, deferredWrittenFile]).
      addCallback(splitArgs(function(dir, file) { return file.copyTo(dir); })).
      addCallback(goog.partial(checkFileContent, 'test content')).
      awaitDeferred(deferredFile).
      addCallback(goog.partial(checkFileContent, 'test content')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testMoveFile');
}

function testAbortWrite() {
  // TODO(nicksantos): This test is broken in newer versions of chrome.
  // We don't know why yet.
  if (true) return;

  if (!fsExists) {
    return;
  }

  var deferredFile = loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE);
  deferredFile.branch().
      addCallback(goog.partial(startWrite, 'test content')).
      addCallback(function(writer) { writer.abort(); }).
      addCallback(
          goog.partial(waitForEvent, goog.fs.FileSaver.EventType.ABORT)).
      awaitDeferred(deferredFile).
      addCallback(goog.partial(checkFileContent, '')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testWriteFile');
}

function testSeek() {
  if (!fsExists) {
    return;
  }

  var deferredFile = loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE);
  deferredFile.branch().
      addCallback(goog.partial(writeToFile, 'test content')).
      addCallback(function(file) { return file.createWriter(); }).
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.INIT)).
      addCallback(function(writer) {
        writer.seek(5);
        writer.write(goog.fs.getBlob('stuff and things'));
      }).
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.WRITING)).
      addCallback(
          goog.partial(waitForEvent, goog.fs.FileSaver.EventType.WRITE)).
      awaitDeferred(deferredFile).
      addCallback(goog.partial(checkFileContent, 'test stuff and things')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testWriteFile');
}

function testTruncate() {
  if (!fsExists) {
    return;
  }

  var deferredFile = loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE);
  deferredFile.branch().
      addCallback(goog.partial(writeToFile, 'test content')).
      addCallback(function(file) { return file.createWriter(); }).
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.INIT)).
      addCallback(function(writer) { writer.truncate(4); }).
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.WRITING)).
      addCallback(
          goog.partial(waitForEvent, goog.fs.FileSaver.EventType.WRITE)).
      awaitDeferred(deferredFile).
      addCallback(goog.partial(checkFileContent, 'test')).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testWriteFile');
}

function testGetLastModified() {
  if (!fsExists) {
    return;
  }
  var now = goog.now();
  loadFile('test', goog.fs.DirectoryEntry.Behavior.CREATE).
      addCallback(function(entry) {
        return entry.getLastModified();
      }).addCallback(function(date) {
        assertRoughlyEquals('Expected the last modified date to be within ' +
                            'a few milliseconds of the test start time.',
                            now, date.getTime(), 2000);
      }).addCallback(continueTesting);

  asyncTestCase.waitForAsync('testGetLastModified');
}

function testCreatePath() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      addCallback(function(testDir) {
        return testDir.createPath('foo');
      }).
      addCallback(function(fooDir) {
        assertEquals('/goog-fs-test-dir/foo', fooDir.getFullPath());
        return fooDir.createPath('bar/baz/bat');
      }).
      addCallback(function(batDir) {
        assertEquals('/goog-fs-test-dir/foo/bar/baz/bat', batDir.getFullPath());
      }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testCreatePath');
}

function testCreateAbsolutePath() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      addCallback(function(testDir) {
        return testDir.createPath('/' + TEST_DIR + '/fee/fi/fo/fum');
      }).
      addCallback(function(absDir) {
        assertEquals('/goog-fs-test-dir/fee/fi/fo/fum', absDir.getFullPath());
      }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testCreateAbsolutePath');
}

function testCreateRelativePath() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      addCallback(function(dir) {
        return dir.createPath('../' + TEST_DIR + '/dir');
      }).
      addCallback(function(relDir) {
        assertEquals('/goog-fs-test-dir/dir', relDir.getFullPath());
        return relDir.createPath('.');
      }).
      addCallback(function(sameDir) {
        assertEquals('/goog-fs-test-dir/dir', sameDir.getFullPath());
        return sameDir.createPath('./././.');
      }).
      addCallback(function(reallySameDir) {
        assertEquals('/goog-fs-test-dir/dir', reallySameDir.getFullPath());
        return reallySameDir.createPath('./new/../..//dir/./new////.');
      }).
      addCallback(function(newDir) {
        assertEquals('/goog-fs-test-dir/dir/new', newDir.getFullPath());
      }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testCreateRelativePath');

}

function testCreateBadPath() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      awaitDeferred(loadTestDir()).
      addCallback(function(dir) {
        // There is only one layer of parent directory from the test dir.
        return dir.createPath('../../../../' + TEST_DIR + '/baz/bat');
      }).
      addCallback(function(batDir) {
        assertEquals('The parent directory of the root directory should ' +
                     'point back to the root directory.',
                     '/goog-fs-test-dir/baz/bat', batDir.getFullPath());
      }).

      awaitDeferred(loadTestDir()).
      addCallback(function(dir) {
        // An empty path should return the same as the input directory.
        return dir.createPath('');
      }).
      addCallback(function(testDir) {
        assertEquals('/goog-fs-test-dir', testDir.getFullPath());
      }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testCreateBadPath');
}

function testGetAbsolutePaths() {
  if (!fsExists) {
    return;
  }

  loadFile('foo', goog.fs.DirectoryEntry.Behavior.CREATE).
      awaitDeferred(loadTestDir()).
      addCallback(function(testDir) {
        return testDir.getDirectory('/');
      }).
      addCallback(function(root) {
        assertEquals('/', root.getFullPath());
        return root.getDirectory('/' + TEST_DIR);
      }).
      addCallback(function(testDir) {
        assertEquals('/goog-fs-test-dir', testDir.getFullPath());
        return testDir.getDirectory('//' + TEST_DIR + '////');
      }).
      addCallback(function(testDir) {
        assertEquals('/goog-fs-test-dir', testDir.getFullPath());
        return testDir.getDirectory('////');
      }).
      addCallback(function(testDir) {
        assertEquals('/', testDir.getFullPath());
      }).
      addBoth(continueTesting);
  asyncTestCase.waitForAsync('testGetAbsolutePaths');
}


function continueTesting(result) {
  asyncTestCase.continueTesting();
  if (result instanceof Error) {
    throw result;
  }
}

function testListEmptyDirectory() {
  if (!fsExists) {
    return;
  }

  loadTestDir().
      addCallback(function(dir) { return dir.listDirectory(); }).
      addCallback(function(entries) { assertArrayEquals([], entries); }).
      addCallback(continueTesting);
  asyncTestCase.waitForAsync('testListEmptyDirectory');
}


function testListDirectory() {
  if (!fsExists) {
    return;
  }

  goog.async.Deferred.succeed().
      // Create the test directory and test entries.
      awaitDeferred(
          loadDirectory('testDir', goog.fs.DirectoryEntry.Behavior.CREATE)).
      awaitDeferred(
          loadFile('testFile', goog.fs.DirectoryEntry.Behavior.CREATE)).
      awaitDeferred(loadTestDir()).

      // Verify the contents of the directory listing.
      addCallback(function(testDir) { return testDir.listDirectory(); }).
      addCallback(function(entries) {
        assertEquals(2, entries.length);

        var dir = goog.array.find(entries, function(entry) {
          return entry.getName() == 'testDir';
        });
        assertNotNull(dir);
        assertTrue(dir.isDirectory());

        var file = goog.array.find(entries, function(entry) {
          return entry.getName() == 'testFile';
        });
        assertNotNull(file);
        assertTrue(file.isFile());
      }).
      addCallback(continueTesting);

  asyncTestCase.waitForAsync('testListDirectory');
}


function testListBigDirectory() {
  // TODO(nicksantos): This test is broken in newer versions of chrome.
  // We don't know why yet.
  if (true) return;

  if (!fsExists) {
    return;
  }

  function getFileName(i) {
    return 'file' + goog.string.padNumber(i, String(count).length);
  }

  // NOTE: This was intended to verify that the results from repeated
  // DirectoryReader.readEntries() callbacks are appropriately concatenated.
  // In current versions of Chrome (March 2011), all results are returned in the
  // first callback regardless of directory size. The count can be increased in
  // the future to test batched result lists once they are implemented.
  var count = 100;

  var expectedNames = [];

  var def = goog.async.Deferred.succeed();
  for (var i = 0; i < count; i++) {
    var name = getFileName(i);
    expectedNames.push(name);

    def.awaitDeferred(
        loadFile(name, goog.fs.DirectoryEntry.Behavior.CREATE));
  }

  def.awaitDeferred(loadTestDir()).
      addCallback(function(testDir) { return testDir.listDirectory(); }).
      addCallback(function(entries) {
        assertEquals(count, entries.length);

        assertSameElements(expectedNames,
                           goog.array.map(entries, function(entry) {
                             return entry.getName();
                           }));
        assertTrue(goog.array.every(entries, function(entry) {
          return entry.isFile();
        }));
      }).
      addCallback(continueTesting);

  asyncTestCase.waitForAsync('testListBigDirectory');
}


function testSliceBlob() {
  // A mock blob object whose slice returns the parameters it was called with.
  var blob = {
    'size': 10,
    'slice': function(start, end) {
      return [start, end];
    }
  };

  // Simulate Firefox 13 that implements the new slice.
  var tmpStubs = new goog.testing.PropertyReplacer();
  tmpStubs.set(goog.userAgent, 'GECKO', true);
  tmpStubs.set(goog.userAgent, 'WEBKIT', false);
  tmpStubs.set(goog.userAgent, 'IE', false);
  tmpStubs.set(goog.userAgent, 'VERSION', '13.0');
  tmpStubs.set(goog.userAgent, 'isVersionOrHigherCache_', {});

  // Expect slice to be called with no change to parameters
  assertArrayEquals([2, 10], goog.fs.sliceBlob(blob, 2));
  assertArrayEquals([-2, 10], goog.fs.sliceBlob(blob, -2));
  assertArrayEquals([3, 6], goog.fs.sliceBlob(blob, 3, 6));
  assertArrayEquals([3, -6], goog.fs.sliceBlob(blob, 3, -6));

  // Simulate IE 10 that implements the new slice.
  var tmpStubs = new goog.testing.PropertyReplacer();
  tmpStubs.set(goog.userAgent, 'GECKO', false);
  tmpStubs.set(goog.userAgent, 'WEBKIT', false);
  tmpStubs.set(goog.userAgent, 'IE', true);
  tmpStubs.set(goog.userAgent, 'VERSION', '10.0');
  tmpStubs.set(goog.userAgent, 'isVersionOrHigherCache_', {});

  // Expect slice to be called with no change to parameters
  assertArrayEquals([2, 10], goog.fs.sliceBlob(blob, 2));
  assertArrayEquals([-2, 10], goog.fs.sliceBlob(blob, -2));
  assertArrayEquals([3, 6], goog.fs.sliceBlob(blob, 3, 6));
  assertArrayEquals([3, -6], goog.fs.sliceBlob(blob, 3, -6));

  // Simulate Firefox 4 that implements the old slice.
  tmpStubs.set(goog.userAgent, 'GECKO', true);
  tmpStubs.set(goog.userAgent, 'WEBKIT', false);
  tmpStubs.set(goog.userAgent, 'IE', false);
  tmpStubs.set(goog.userAgent, 'VERSION', '2.0');
  tmpStubs.set(goog.userAgent, 'isVersionOrHigherCache_', {});

  // Expect slice to be called with transformed parameters.
  assertArrayEquals([2, 8], goog.fs.sliceBlob(blob, 2));
  assertArrayEquals([8, 2], goog.fs.sliceBlob(blob, -2));
  assertArrayEquals([3, 3], goog.fs.sliceBlob(blob, 3, 6));
  assertArrayEquals([3, 1], goog.fs.sliceBlob(blob, 3, -6));

  // Simulate Firefox 5 that implements mozSlice (new spec).
  delete blob.slice;
  blob.mozSlice = function(start, end) {
    return ['moz', start, end];
  };
  tmpStubs.set(goog.userAgent, 'GECKO', true);
  tmpStubs.set(goog.userAgent, 'WEBKIT', false);
  tmpStubs.set(goog.userAgent, 'IE', false);
  tmpStubs.set(goog.userAgent, 'VERSION', '5.0');
  tmpStubs.set(goog.userAgent, 'isVersionOrHigherCache_', {});

  // Expect mozSlice to be called with no change to parameters.
  assertArrayEquals(['moz', 2, 10], goog.fs.sliceBlob(blob, 2));
  assertArrayEquals(['moz', -2, 10], goog.fs.sliceBlob(blob, -2));
  assertArrayEquals(['moz', 3, 6], goog.fs.sliceBlob(blob, 3, 6));
  assertArrayEquals(['moz', 3, -6], goog.fs.sliceBlob(blob, 3, -6));

  // Simulate Chrome 20 that implements webkitSlice (new spec).
  delete blob.mozSlice;
  blob.webkitSlice = function(start, end) {
    return ['webkit', start, end];
  };
  tmpStubs.set(goog.userAgent, 'GECKO', false);
  tmpStubs.set(goog.userAgent, 'WEBKIT', true);
  tmpStubs.set(goog.userAgent, 'IE', false);
  tmpStubs.set(goog.userAgent, 'VERSION', '536.10');
  tmpStubs.set(goog.userAgent, 'isVersionOrHigherCache_', {});

  // Expect webkitSlice to be called with no change to parameters.
  assertArrayEquals(['webkit', 2, 10], goog.fs.sliceBlob(blob, 2));
  assertArrayEquals(['webkit', -2, 10], goog.fs.sliceBlob(blob, -2));
  assertArrayEquals(['webkit', 3, 6], goog.fs.sliceBlob(blob, 3, 6));
  assertArrayEquals(['webkit', 3, -6], goog.fs.sliceBlob(blob, 3, -6));

  tmpStubs.reset();
}


function loadTestDir() {
  return deferredFs.branch().addCallback(function(fs) {
    return fs.getRoot().getDirectory(
        TEST_DIR, goog.fs.DirectoryEntry.Behavior.CREATE);
  });
}

function loadFile(filename, behavior) {
  return loadTestDir().addCallback(function(dir) {
    return dir.getFile(filename, behavior);
  });
}

function loadDirectory(filename, behavior) {
  return loadTestDir().addCallback(function(dir) {
    return dir.getDirectory(filename, behavior);
  });
}

function startWrite(content, file) {
  return file.createWriter().
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.INIT)).
      addCallback(function(writer) {
        writer.write(goog.fs.getBlob(content));
        return writer;
      }).
      addCallback(
          goog.partial(checkReadyState, goog.fs.FileSaver.ReadyState.WRITING));
}

function waitForEvent(type, target) {
  var d = new goog.async.Deferred();
  goog.events.listenOnce(target, type, d.callback, false, d);
  return d;
}

function writeToFile(content, file) {
  return startWrite(content, file).
      addCallback(
          goog.partial(waitForEvent, goog.fs.FileSaver.EventType.WRITE)).
      addCallback(function() { return file; });
}

function checkFileContent(content, file) {
  return checkFileContentAs(content, 'Text', undefined, file);
}

function checkFileContentWithEncoding(content, encoding, file) {
  checkFileContentAs(content, 'Text', encoding, file);
}

function checkFileContentAs(content, filetype, encoding, file) {
  return file.file().
      addCallback(function(blob) {
        return goog.fs.FileReader['readAs' + filetype](blob, encoding);
      }).
      addCallback(goog.partial(checkEquals, content));
}

function checkEquals(a, b) {
  if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
    assertEquals(a.byteLength, b.byteLength);
    var viewA = new DataView(a);
    var viewB = new DataView(b);
    for (var i = 0; i < a.byteLength; i++) {
      assertEquals(viewA.getUint8(i), viewB.getUint8(i));
    }
  } else {
    assertEquals(a, b);
  }
}

function checkFileRemoved(filename) {
  return loadFile(filename).
      addCallback(goog.partial(fail, 'expected file to be removed')).
      addErrback(function(err) {
        assertEquals(err.code, goog.fs.Error.ErrorCode.NOT_FOUND);
        return true; // Go back to callback path
      });
}

function checkReadyState(expectedState, writer) {
  assertEquals(expectedState, writer.getReadyState());
}

function splitArgs(fn) {
  return function(args) { return fn(args[0], args[1]); };
}
